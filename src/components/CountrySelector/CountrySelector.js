import React from "react";
import {  Select, Row, Col } from "antd";

const { Option } = Select;

export const CountrySelector = ({ countries, handleOnChange }) => {

  return (
    <div>
      <Row justify="start">
        <Col xl={8} xs={24}>
          <label htmlFor="">Quốc Gia</label>
          <Select defaultValue="Viet Nam" style={{ display: "block" }} onChange={handleOnChange}>
            {countries.map((country) => (
              <Option value={country.Slug} key={country.ISO2}>{country.Country}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};
