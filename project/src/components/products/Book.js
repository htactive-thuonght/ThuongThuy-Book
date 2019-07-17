import React from "react";
import FormAddBook from "./FormAddBook.js";
const data = [
  {
    id: 1,
    name: "dac nhan tam",
    img:
      "https://vn-test-11.slatic.net/original/6f76891aa9c8a3d2504a7a1c41d3f9aa.jpg_340x340q80.jpg"
  },
  {
    id: 2,
    name: "tieng chim hot trong bui man gai",
    img:
      "https://vn-test-11.slatic.net/original/6f76891aa9c8a3d2504a7a1c41d3f9aa.jpg_340x340q80.jpg"
  },
  {
    id: 3,
    name: "mat biec",
    img:
      "http://st.galaxypub.vn/staticFile/Subject/2018/11/05/29917/dao-dien-victor-vu-truy-lung-nang-mat-biec-vabrchang-si-tinh_5915188.jpg"
  },
  {
    id: 4,
    name: "trang quynh",
    img:
      "https://4.bp.blogspot.com/-NgSVBfCZsMA/V5MXL2UvK2I/AAAAAAAAE7Y/ZvK1aaKZa50VBlDblrGBVYFTwEdWuNavgCKgB/s832/img0012520-2-.jpg"
  }
];

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listBook: data
    };
    //console.log(this.state.listBook);
  }
  addItem = (id, name) => {
    const newList = [
      ...this.state.listBook,
      {
        id: id,
        name: name
      }
    ];
    this.setState({ listBook: newList });
    // console.log(this.state.listTask);
  };

  render() {
    return (
      <div>
        <FormAddBook listBook={this.state.listBook} addItem={this.addItem} />
      </div>
    );
  }
}
