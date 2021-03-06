import React, { useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { purple } from "@material-ui/core/colors";

import "../../../styles/variables.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  icon: {
    color: 'var(--button)',
    '&:hover': {
      color: 'var(--button-hover)',
    },
  },
  container: {
    padding: '3rem 2rem',
  },
  submit: {
    color: 'white',
    fontFamily: 'var(--header-font)',
    backgroundColor: 'var(--button)',
    '&:hover': {
      backgroundColor: 'var(--button-hover)',
      color: '#fff',
    },
  }
});

/* Libraries */
const axios = require('axios');

const theme = createMuiTheme({
  palette: {
    primary: purple,
  }
});


export default function NotesList(props) {
  const classes = useStyles();
  // const [notes, setNotes] = useState("");
  const { notes, setNotes } = props
  const [newNoteInput, setNewNoteInput] = useState("");
  // useEffect(() => {
  //   axios.get(`api/notes/${props.userID}/${props.skillID}`)
  //     .then(response => {
  //       const data = response.data.map(note => {
  //         note.key = note.id
  //         return note
  //       })
  //       setNotes(data);
  //     })
  //     .catch(error => console.log(error));  
  // }, [notes]);

  function addNote() {
    const newNote = {
      user_id: props.userID,
      skill_id: props.skillID,
      note: newNoteInput,
    }

    return axios.post(`api/notes`, newNote)
      .then(function(response) {
        const notesCopy = notes
        notesCopy.push(newNote)
        setNotes(notesCopy)
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  function deleteNote(id) {
    return axios.delete(`api/notes/${id}`, { id })
      .then(function(response) {
        const noteCopy = notes.filter((note) => {
          if (note.id !== id) {
            note.key = note.id
            return note
          }

          return null;
        });
        setNotes(noteCopy);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  return (
    <Card className={classes.root}>
      <CardContent className={classes.container} style={{ height: 370, overflow: 'auto' }}>
        <Typography gutterBottom variant="h6" component="h4">
          Notes
          </Typography>
        {Object.keys(notes).map((id) => {
          return (
            <div key={id}>
              <IconButton
                className={classes.icon}
                aria-label="delete"
                onClick={(event) => {
                  if (window.confirm('Are you sure you want to delete?')) {
                    deleteNote(notes[id].id);
                  }
                }}>
                <CloseIcon />
              </IconButton>
              {notes[id].note}
            </div>
          )
        })}
      </CardContent>
      <CardActions>
        <ThemeProvider theme={theme}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              value={newNoteInput}
              label="New Note"
              onChange={(event) => setNewNoteInput(event.target.value)}
            />
          </form>
          <Button
            className={classes.submit}
            size="small"
            onClick={() => {
              addNote()
              setNewNoteInput('')
            }}>
            Add Note
          </Button>
        </ThemeProvider>
      </CardActions>
    </Card>
  );
}

