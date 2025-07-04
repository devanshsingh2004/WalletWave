import React from "react";
import { Col, Form, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
function Register() {
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="m-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">WalletWave - Register</h1>

        <h1 className="text-sm underline" onClick={() => navigate("/login")}>
          Already a member , Login
        </h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Mobile" name="phoneNumber">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Identification Type" name="identificationType">
              <select>
                <option value="AADHAR CARD">Aadhar Card</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING LICENSE">Driving License</option>
                <option value="PAN CARD">Pan Card</option>
                <option value="VOTER ID">Voter Id</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationNumber"
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input type="password" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <input type="password" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
