import styled from 'styled-components';

export const TagWrapper = styled.div`
  height: 22px;
  margin-bottom: 5px;
  .ant-tag.ant-tag-has-color{
    transition: all 0.5s;
    height: 100%;
    .x {
      display: none;
      margin-left: 4px;
    }
    &:hover {
      border-color: red;
      border: none;
      background-color: white !important;
      color: red;

      .x {
        display: inline-block;
      }
      cursor: pointer;

    }
  }
`;

export const CustomInput = styled.input`
  /* box-sizing: border-box; */
  margin: 0;
  font-variant: tabular-nums;
  /* list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum"; */
  margin-top: 1.6px;
  position: relative;
  display: inline-block;
  height: 22px;
  width: 75px;
  min-width: 0;
  padding: 2px 6px;
  color: rgba(0,0,0,.85);
  font-size: 11px;
  /* line-height: 1; */
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-style: dashed;
  border-radius: 2px;
  -webkit-transition: all .3s;
  transition: all .3s;
  &::placeholder {
    color: #d9d9d9;
  }
  &:hover {
    /* border-style: solid; */
    border-color: #69c0ff;
    cursor: pointer;
  }
  &:focus {
    border-style: solid;
    border-color: #69c0ff;
    cursor: auto;
    margin-top: 0;
    height: 25px;
    width: 78px;
    &::placeholder {
      color: transparent;
    }
  }
`;