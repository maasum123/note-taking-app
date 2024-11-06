document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notes');

    // Fetch and display notes
    const fetchNotes = async () => {
        try {
            const response = await fetch('/api/notes');
            const notes = await response.json();
            notesContainer.innerHTML = notes.map(note => `
                <div class="note" data-id="${note._id}">
                    <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Add new note
    noteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        try {
            await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            noteForm.reset();
            fetchNotes();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    });

    // Delete note
    window.deleteNote = async (id) => {
        try {
            await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    // Initial fetch
    fetchNotes();
});