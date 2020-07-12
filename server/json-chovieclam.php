<?php
// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV') || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Define application environment
define('SITE_CODE', getenv('SITE_CODE'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
		realpath(APPLICATION_PATH . '/../../library'),
		realpath(APPLICATION_PATH . '/../../../library'),
		realpath(APPLICATION_PATH . '/../../../../library'),
		realpath(APPLICATION_PATH . '/../../../../../library'),
    get_include_path(),
)));

require_once 'Zend/Loader/Autoloader.php';
$loader = Zend_Loader_Autoloader::getInstance();
$loader->registerNamespace('Core');
$loader->registerNamespace('Nld');

$config = new Zend_Config_Ini(APPLICATION_PATH.'/configs/application.ini', APPLICATION_ENV);
$db = Zend_Db::factory($config->resources->db->adapter, $config->resources->db->params);
Zend_Db_Table::setDefaultAdapter($db);

$cache = Zend_Cache::factory('Core', 'File', array('lifetime' => 300, 'automatic_serialization' => true), array('cache_dir' => '../cache/'));

if (!($result = $cache->load('export_chovieclam'))) {

	$result = Nld_Models::select()->union(array(
		Nld_Models::select()
			->from(array('m' => Nld_Models::getTable('Market')->info('name')), array(
				'key' 			=> new Zend_Db_Expr("1"), 
				'id' 				=> 'm.id',
				'title' 		=> new Zend_Db_Expr("CONCAT(IF(m.criteria='[Tìm người]','Tìm người','Tìm việc'), ' &raquo; ', p.title)"),
				'updated' 	=> 'm.created', 
				'doituong' 	=> new Zend_Db_Expr("m.company")
			))
			->joinLeft(array('p' => Nld_Models::getTable('Profession')->info('name')), 
				'p.id IN (m.pro)', array('_profession' => 'p.title'))
			->joinLeft(array('c' => Nld_Models::getTable('Country')->info('name')), 
				'c.id IN (m.country)', array('_country' => 'c.title'))
			->where('status=1')
			->where('criteria="[Tìm người]" OR criteria="[Tìm việc]"')
	, 
		Nld_Models::select()
			->from(array('r' => Nld_Models::getTable('Resume')->info('name')), array(
				'key' 			=> new Zend_Db_Expr("2"), 
				'id' 				=> 'r.id',
				'title' 		=> new Zend_Db_Expr("CONCAT('Tìm việc', ' &raquo; ', p.title)"),
				'updated' 	=> 'r.updated', 
				'doituong' 	=> new Zend_Db_Expr("r.fullname"),
			))
			->joinLeft(array('p' => Nld_Models::getTable('Profession')->info('name')), 
				'p.id IN (r.pro)', array('_profession' => 'p.title'))
			->joinLeft(array('c' => Nld_Models::getTable('Country')->info('name')), 
				'c.id IN (r.country)', array('_country' => 'c.title'))
			->where('status=2')
	,
		Nld_Models::select()
			->from(array('j' => Nld_Models::getTable('Job')->info('name')), array(
				'key' 			=> new Zend_Db_Expr("3"), 
				'id' 				=> 'j.id', 
				'title' 		=> new Zend_Db_Expr("CONCAT('Tìm người', ' &raquo; ', p.title)"),
				'updated' 	=> 'j.updated', 
				'doituong' 	=> new Zend_Db_Expr("j.i_name")
			))
			->joinLeft(array('p' => Nld_Models::getTable('Profession')->info('name')), 
				'p.id IN (j.pro)', array('_profession' => 'p.title'))
			->joinLeft(array('c' => Nld_Models::getTable('Country')->info('name')), 
				'c.id IN (j.country)', array('_country' => 'c.title'))
			->where('status=2')
	), Zend_Db_Select::SQL_UNION_ALL)->order(array('updated DESC', 'id DESC'))->limit(12)->query()->fetchAll();
	$cache->save($result, 'export_chovieclam');
}


if (!($json = $cache->load('_json_chovieclam'))) {
	$list = [];
	if(is_array(@$result))
	foreach($result as $i => $row)
	{
		$link = '/cho-viec-lam/cho-viec-lam/'.$row['id'].'-viec-lam.html';
		if($row['key']==2)
			$link = '/nha-tuyen-dung/'.$row['id'].'-ung-vien.html';
		elseif($row['key']==3)
			$link = '/ung-vien/'.$row['id'].'-viec-lam.html';
		
		$list[] = array(
			"link" => "http://vieclam.nld.com.vn".$link, 
			"title" => $row['doituong'], 
			"desc" => $row['_country']." | ".date('d-m-Y',$row['updated'])." | ".$row['title']
		);
	}
	$json = json_encode($list);
	$cache->save($json, '_json_chovieclam');
}
$db->closeConnection();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
echo $json;
