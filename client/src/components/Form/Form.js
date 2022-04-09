import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.redult?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memory and like other's memories.
                </Typography>
            </Paper>
        );
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
                <TextField
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                />
                <TextField
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                />
                <TextField
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(","),
                        })
                    }
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
