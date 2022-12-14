import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Axios from "axios"
import { addNotes } from "./functions";

export default function AddNotes({ setNotes,setFilteredNotes, setIsModalOpen,Id }) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const HOST = "http://127.0.0.1:5000";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 1,
    p: 8,
  };
  const responsiveStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 1,
    p: 3,
  };
  const addNote = (title, noteContent) => {
    const data = {
        uid: Id,
        title: title,
        note: noteContent
      };
    Axios.post(`${HOST}/create_note`,data)
    .then((response) => {
        setNotes(response.data.notes);
        setFilteredNotes(response.data.notes);
        setIsModalOpen(false);
        setNoteContent("");
        setNoteTitle("");
    })
    .catch((error) => {
        const data = error.response.data
        if (error.response.status === 400) {
            console.log("something went wrong")
        }
      })
  };
  const newNote = async (event) => {
    event.preventDefault();
    setLoadingButton(true);

    addNote(noteTitle, noteContent);
    // const data = await response.data;
    setLoadingButton(false);
    // const addedNote = data.note;

    // onSubmit(addedNote);
    setNoteContent("");
    setNoteTitle("");
  };

  return (
    <Box sx={responsiveStyle} md={style}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add Note
      </Typography>
      <form onSubmit={newNote}>
        <TextField
          size="small"
          disabled={loadingButton}
          label="Title"
          variant="outlined"
          name="title"
          onChange={(e) => setNoteTitle(e.target.value)}
          value={noteTitle}
          fullWidth
        />
        <TextField
          rows={4}
          multiline
          size="small"
          disabled={loadingButton}
          label="Content"
          onChange={(e) => setNoteContent(e.target.value)}
          value={noteContent}
          name="content"
          fullWidth
          sx={{ my: 2 }}
        />
        <LoadingButton
          loading={loadingButton}
          type="submit"
          variant="outlined"
          sx={{ mx: "auto" }}
        >
          Add
        </LoadingButton>
      </form>
    </Box>
  );
}