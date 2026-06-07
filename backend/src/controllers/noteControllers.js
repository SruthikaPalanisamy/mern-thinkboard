import Note from "../models/Note.js";

export  async function getAllNotes( _ , res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date in descending order   
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes" });
    }
};


export async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    }
    
    catch (error) {
console.error("Error fetching note:", error);
res.status(500).json({ message: "Error fetching note" });
    }
    
}

export  async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Error creating note" });
    }
};

export  async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true }); // Return the updated note
        if (!note) { // If no note is found with the given ID or if the given id is wrong
            return res.status(404).json({ message: "Note not found" });
        }
        else {
            return res.status(200).json({ message: "Note updated successfully", note });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function deleteNote(req,res) {
    try {

const note = await Note.findByIdAndDelete(req.params.id);
if (!note) {
    return res.status(404).json({ message: "Note not found" });
}
else {
    return res.status(200).json({ message: "Note deleted successfully" });
    }
}
    catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};