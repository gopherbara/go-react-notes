import {Box, List, ThemeIcon} from "@mantine/core";
import useSWR from "swr";
import './App.css'
import AddNote from "./components/AddNote";
import {CheckCircleFillIcon, InfoIcon} from "@primer/octicons-react";

export const ENDPOINT = 'http://localhost:4000'

export interface Note {
    id: number;
    title: string;
    content: string;
}

const fetcher = (url: string) =>
    fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {

    const {data, mutate} = useSWR<Note[]>('notes', fetcher)

    return <Box
        sx={(theme) => ({
            padding: "2rem",
            width: "100%",
            maxWidth: "40rem",
            margin: "0 auto"
        })}
    >
        <List spacing="xs" mb={12} center>
            {data?.map((note) => {
                return (

                    <List.Item className="card" key={`note_${note.id}`}
                               icon={
                                   <ThemeIcon color="gray" size={24} radius="xl">
                                       <InfoIcon size={20}></InfoIcon>
                                   </ThemeIcon>
                               }>
                    {note.title}
                    <br />{note.content}
                    </List.Item>);
            })}
        </List>
        <AddNote mutate={mutate}></AddNote>
    </Box>;

}

export default App
