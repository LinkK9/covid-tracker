import { Row } from "antd";
import { Col } from "antd";
import { Card, Typography } from "antd";
import React from "react";
import Classes from "./Highlight.module.css";
import CountUp from 'react-countup';

const { Text } = Typography;

const cardStyle = {
  confirmed: {
    paddingTop: "5px",
    borderLeft: "10px solid #c9302c",
    maxHight: '50px'
  },
  recovered: {
    paddingTop: "5px",
    borderLeft: "10px solid #28a745",
  },
  death: {
    paddingTop: "5px",
    borderLeft: "10px solid grey",
  },
};

export const Highlight = ({ summary }) => {
  return (
    <div>
      <Row gutter={32}>
        {summary.map((data) => (
          <Col xl={8} xs={24}>
            <Card bodyStyle={cardStyle[data.type]}>
              <Text style={{ display: "block" }}>{data.title}</Text>
              <Text strong style={{fontSize: 16}} >
                <CountUp end={data.count} separator=" " duration={2} />
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
