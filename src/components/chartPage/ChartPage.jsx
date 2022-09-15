import BarChart from "../barChart/BarChart";
import '../barChart/barStyle.css'

export default function ChartPage() {
  return <div className="container">{ <BarChart dataId={window.location.pathname.slice(7)}></BarChart> }</div>;
}
