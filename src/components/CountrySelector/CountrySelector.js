import React from "react";
import {  Select, Row, Col, Typography } from "antd";
import './CountrySelector.css'

const { Option } = Select;
const { Text } = Typography;

export const CountrySelector = ({ countries, handleOnChange }) => {

  return (
    <div style={{margin: '16px 0'}}>
      <Row justify="start">
        <Col xl={6} xs={24}>
          <Text type='secondary' >Quốc Gia:</Text>
          <Select defaultValue="Viet Nam" style={{ display: "block" }} onChange={handleOnChange}>
            {countries.map((country) => (
              <Option className='' value={country.Slug} key={country.ISO2}>{country.Country}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};
