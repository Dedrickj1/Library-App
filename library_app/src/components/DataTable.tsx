import { useState } from 'react'
import Button from "./Button"
import Modal from "./Modal"
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';


const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width:90,},
    { field: 'Author_name', headerName: "Author's Name", flex:1},
    { field: 'Book_title', headerName: "Title of Book", flex:1},
    { field: 'Book_length', headerName: "Length of Book", flex:1},
    { field: 'Hard_cover', headerName: "Hard Cover", flex: 1},
    { field: 'Paper_cover', headerName: "Paper Cover", flex: 1}
]


function DataTable() {
    const [ open, setOpen ] = useState(false);
    const { contactData, getData } = useGetData();
    const [ selectionModel, setSelectionModel ] = useState<any>([])
    console.log(contactData)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => {window.location.reload()}, 500)
    }


  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
        />
        <div className="flex flex-row">
            <div>
                <button
                    className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
                    onClick={() => handleOpen()}
                >
                    Add A Book 
                </button>
            </div> 
            <Button onClick={handleOpen} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white" >Update Library Info</Button>
            <Button onClick={deleteData} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white" >Delete Library Info</Button>
        </div>
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
            style={{ height: 400, width: '100%'}}
            >
            <h2 className="p-3 bg-slate-300 my-2 rounded">Our Books</h2>
            <DataGrid
                rows={contactData}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(item: any) => {
                    setSelectionModel(item);
                }}
                pagination={true} // Enable pagination
                pageSizeOptions={[5]} // Set page size options
            />
        </div>
    </>
  )
}

export default DataTable