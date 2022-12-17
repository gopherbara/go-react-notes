import {useState} from "react";
import {useForm} from "@mantine/form";
import {Group, Modal, Button, TextInput, Textarea} from "@mantine/core";
import {ENDPOINT, Note} from "../App";
import {KeyedMutator} from "swr";

function AddNote({mutate}: {mutate: KeyedMutator<Note[]>}) {
    /*
    check if addnote dialog is open or close
     */
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues:{
            title: '',
            content:''
        }
    })

    async function createNote(values:{title:string, content:string}){
        const updated = await fetch(`${ENDPOINT}/note`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then( (r) => r.json());

        mutate(updated);
        form.reset();
        setOpen(false);
    }

    return <>
        <Modal
            opened={open}
            onClose={() => setOpen(false)}
            title = 'Create note'>
            <form onSubmit={form.onSubmit(createNote)}>
                <TextInput
                    required
                    mb={12}
                    label="Note title"
                    placeholder="enter note name"
                    {...form.getInputProps("title")}
                />
                <Textarea
                    required
                    mb={12}
                    label="Content"
                    placeholder="enter everything U wanna note here"
                    {...form.getInputProps("content")}/>
                <Button type="submit">Create Note</Button>
            </form>
        </Modal>

        <Group position = "center">
            <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                Add Note
            </Button>
        </Group>
    </>
}

export default AddNote