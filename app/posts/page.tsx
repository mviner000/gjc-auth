"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for a note
type Note = {
  id: number;
  title: string;
  created_by: string;
  content: string;
};

const PostPage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState<Note>({
    id: 0,
    title: '',
    created_by: '',
    content: '',
  });

  // Fetch notes from the API
  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>('https://gjclibrary.com/api/notes/');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Error fetching notes');
    }
  };

  // Fetch notes when the component is mounted
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to create a new note
  const createNote = async () => {
    try {
      const response = await axios.post<Note>('https://gjclibrary.com/api/notes/', newNote);
      setNotes([...notes, response.data]);
      setNewNote({
        id: 0,
        title: '',
        created_by: '',
        content: '',
      });
      setError(null);
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Error creating note');
    }
  };

  // Function to delete a note
  const deleteNote = async (noteId: number) => {
    try {
          await axios.delete(`https://gjclibrary.com/api/notes/${noteId}`);
          setNotes(notes.filter((note) => note.id !== noteId));
          setError(null);
        } catch (error) {
          console.error('Error deleting note:', error);
          setError('Error deleting note');
        }
      };
      
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-5">All Notes</h1>
      {error && <div className="error-message mb-4 text-red-500">{error}</div>}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Author</th>
            <th className="border border-gray-400 px-4 py-2">Content</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
                <td className="border border-gray-400 px-4 py-2">{note.id}</td>
                <td className="border border-gray-400 px-4 py-2">{note.title}</td>
                <td className="border border-gray-400 px-4 py-2">{note.created_by}</td>
                <td className="border border-gray-400 px-4 py-2">{note.content}</td>
                <td className="border border-gray-400 px-4 py-2">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={(e) => e.preventDefault()} className="mt-4">
        <div className="flex mb-4">
          <input
            type="text"
            value={newNote.title}
            onChange={(e) =>
              setNewNote({ ...newNote, title: e.target.value })
            }
            placeholder="Title"
            className="border border-gray-400 px-4py-2 mr-2 flex-1"
            required
          />
          <textarea
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            placeholder="Content"
            className="border border-gray-400 px-4 py-2 flex-1"
            required
          />
        </div>
        <button
          type="submit"
          onClick={createNote}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default PostPage