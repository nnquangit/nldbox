import * as React from 'react';
import fetch from 'node-fetch';

export interface VieclamCardProps {
  title: string;
  desc: string;
  link: string;
}

export function VieclamCard({ title, desc, link }: VieclamCardProps) {
  return (<div className="vl-job-item">
    <div className="vl-job-item__head">
      <a className="vl-job-item__title" href={link}>{title}</a>
    </div>
    <div className="vl-job-item__desc" dangerouslySetInnerHTML={{ __html: desc }}></div>
  </div>)
}

export interface ChovieclamProps {
  api: string;
}
export interface ChovieclamState {
  list: VieclamCardProps[];
}

export class Chovieclam extends React.Component<ChovieclamProps, ChovieclamState> {
  constructor(props: ChovieclamProps) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    fetch(this.props.api)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        return [];
      })
      .then(list => this.setState({ list }))
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
