import * as React from 'react';
// import './App.css';

const sampleData = [
  {
    title: 'CÔNG TY TNHH CƠ KHÍ HIỆP PHƯỚC',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ NGUYỄN PHAN',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'TUYỂN SINH DU HỌC NGHỀ ĐIỀU DƯỠNG TẠI ĐỨC',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ PHAN',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH CƠ KHÍ HIỆP PHƯỚC',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ NGUYỄN PHAN',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'TUYỂN SINH DU HỌC NGHỀ ĐIỀU DƯỠNG TẠI ĐỨC',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  },
  {
    title: 'CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ PHAN',
    link: '/',
    desc: 'Hồ Chí Minh | 22-06-2020 | Tìm việc » Kế toán / Kiểm toán'
  }
];

interface VieclamCardProps {
  title: string;
  desc: string;
  link: string;
}

function VieclamCard({ title, desc, link }: VieclamCardProps) {
  return (<div className="vl-job-item">
    <div className="vl-job-item__head">
      <a className="vl-job-item__title" href={link}>{title}</a>
    </div>
    <div className="vl-job-item__desc">{desc}</div>
  </div>)
}

export interface ChovieclamProps {

}
export interface ChovieclamState {
  list: object[];
}

export class Chovieclam extends React.Component<ChovieclamProps, ChovieclamState> {
  constructor(props: ChovieclamProps) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.setState({ list: sampleData })
  }
  componentDidUpdate() {
  }

  render() {
    const { list } = this.state;
    return (
      <div className="vl-box">
        <div className="vl-box-header">
          <h2 className="vl-box__head">
            <a href="/thoi-su.htm" className="vl-box__title">Chợ việc làm</a>
          </h2>
        </div>
        <div className="vl-job-list">{list.map(VieclamCard)}</div>
      </div>
    );
  }
}
