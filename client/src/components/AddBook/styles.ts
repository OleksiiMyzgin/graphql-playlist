import styled from "styled-components";

export const Form = styled.form`
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 400px;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const Label = styled.label`
  text-align: right;
  padding: 6px;
`;

export const Input = styled.input`
  margin: 4px 0;
  padding: 6px;
  box-sizing: border-box;
`;

export const Select = styled(Input)``;

export const Button = styled.button`
  color: #fff;
  font-size: 2em;
  background: #ad1457;
  border: 0;
  padding: 0 10px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
