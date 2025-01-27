import React, { useState, useRef, useEffect, useReducer } from "react";
import { db } from "../firebaseInit";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

//reducer function
function blogsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...state];
    case "REMOVE":
      return state.filter((blog, index) => index !== action.index);
    default:
      return [];
  }
}

//Blogging App using Hooks
export default function Blog() {
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);

  // const [blogs, dispatch] = useReducer(blogsReducer, []);

  const titleRef = useRef(null);

  //initial focus on title field
  useEffect(() => {
    titleRef.current.focus();
  }, []); //equivalent to componentDidMount in class based component after giving empty dependencies

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blogs";
    }
  });
  useEffect(() => {
    // async function fetchData() {
    //   const snapShot = await getDocs(collection(db, "Blogs"));
    //   console.log(snapShot);
    //   const blogs = snapShot.docs.map((doc) => {
    //     return {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //   });
    //   console.log(blogs);
    //   setBlogs(blogs);
    // }
    // fetchData();

    //onSnapshot is listner for realtime update
    const unsub = onSnapshot(collection(db, "Blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
    });
  }, []);

  //Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e) {
    e.preventDefault();

    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    //1. Add a new document with a generated id.
    // const docRef = await addDoc(collection(db, "Blogs"), {
    //   title: formData.title,
    //   content: formData.content,
    //   cratedOn: new Date(),
    // });
    //console.log("Document written with ID: ", docRef.id);
    //2.setDcc - ideal when you are creating your own id
    const docRef = doc(collection(db, "Blogs"));
    await setDoc(docRef, {
      title: formData.title,
      content: formData.content,
      cratedOn: new Date(),
    });

    setFormData({ title: "", content: "" });
    // setTitle("");
    // setContent("")

    //focus on title field after add button is clicked
    // titleRef.current.focus();
    console.log(blogs);
  }

  async function removeBlog(id) {
    // setBlogs(blogs.filter((blog, index) => i !== index));
    const docRef = doc(db, "Blogs", id);
    await deleteDoc(docRef);
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              ref={titleRef}
              required
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog goes here.."
              value={formData.content}
              required
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>

      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-btn">
            <button onClick={() => removeBlog(blog.id)} className=" btn remove">
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
