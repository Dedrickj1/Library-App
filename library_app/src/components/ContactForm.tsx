import Button from "./Button"
import Input from "./Input"


import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux';
import { chooseAuthor_name, chooseBook_title, chooseBook_length, chooseHardcover, choosePaperback} from "../redux/slices/RootSlice";
// interfaces
interface ContactFormProps {
    id?: string[]
}


const ContactForm = (props:ContactFormProps) => {
    const { register, handleSubmit } = useForm({})
    const dispatch = useDispatch();
    const store = useStore();

    const onSubmit = (data: any, event: any) => {
        console.log(`ID: ${typeof props.id}`);
        console.log(props.id)
        console.log(data)
        if (props.id && props.id.length > 0){
          server_calls.update(props.id[0], data)
          console.log(`Updated: ${data.name} ${props.id}`)
          setTimeout(() => {window.location.reload()}, 1000);
          event.target.reset()
        } else {
          dispatch(chooseAuthor_name(data.author_name));
          dispatch(chooseBook_title(data.Book_title));
          dispatch(chooseBook_length(data.Book_length));
          dispatch(chooseHardcover(data.hardcover));
          dispatch(choosePaperback(data.paperback));

          server_calls.create(store.getState())
          // setTimeout( () => {window.location.reload()}, 1000);
        }
    }

    return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label htmlFor="author_name">Author's Name</label>
              <Input {...register('author_name')} name='author_name' placeholder="Author name" />
            </div>
            <div>
              <label htmlFor="book_title">Book title</label>
              <Input {...register('book_title')} name='book_title' placeholder="Book title" />
            </div>
            <div>
              <label htmlFor="book_length">Book length</label>
              <Input {...register('book_length')} name='book_length' placeholder="Book length" />
            </div>
            <div>
              <label htmlFor="hard_cover">Hardcover?</label>
              <Input {...register('hard_cover')} name='hard_cover' placeholder="Hard cover" />
            </div>
            <div>
              <label htmlFor="paper_cover">Papercover?</label>
              <Input {...register('paper_cover')} name='paper_cover' placeholder="Paper cover" />
            </div>
            <div className="flex p-1">
              <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-600 text-white"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )
    }

export default ContactForm