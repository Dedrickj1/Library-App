import { createSlice } from "@reduxjs/toolkit"


const rootSlice = createSlice({
    name: "root",
    initialState: {
        author_name: "Author_name",
        book_title: "Book_title",
        book_length: "Book_length",
        book_hardcover: "Hardcover",
        book_paperback: "Paperback"
    },
    reducers:{
        chooseAuthor_name: (state, action) => { state.author_name = action.payload },
        chooseBook_title: (state, action) => { state.book_title = action.payload },
        chooseBook_length: (state, action) => { state.book_length = action.payload },
        chooseHardcover: (state, action) => { state.book_hardcover = action.payload },
        choosePaperback: (state, action) => { state.book_paperback = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const {chooseAuthor_name, chooseBook_title, chooseBook_length, chooseHardcover, choosePaperback} =rootSlice.actions