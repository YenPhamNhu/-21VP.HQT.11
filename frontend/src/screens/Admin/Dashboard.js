import React from "react";
import Statistique from "../../components/statistique";
import ChartComponent from "../../components/chart";
import ScheduleComming from "../../components/scheduleComming";
import { Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div className='container mt-5 mb-5'>
      <div>
        <Statistique />
      </div>
      <Row
        className='justify-content-center d-flex'
        style={{ marginTop: "30px" }}
      >
        <Col className='text-center'>
          <ChartComponent />
        </Col>
        <Col className='text-center'>
          <ScheduleComming />
        </Col>
      </Row>
      {/* <div style={{ width: "65%" }}>
        <ChartComponent />
      </div>
      <div>
        <ScheduleComming />
      </div> */}
    </div>
  );
}
