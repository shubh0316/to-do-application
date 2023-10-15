import {useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";


export default function AddTodo( {mutate} : {mutate: KeyedMutator<Todo[]>} ){
    const[open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        },
    });
    async function createTodo(values: {title:string, body: string }){

        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(values),
        }).then((r) => r.json());         


        mutate(updated);
        form.reset();
        setOpen(false);
    }
    return(
    <>  
        <Modal opened={open} onClose={() => setOpen(false)} title="create todo">
         <form onSubmit={form.onSubmit(createTodo)}>
            <TextInput 
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
            />
            <Textarea 
            required
            mb={12}
            label="body"
            placeholder="Tell me more..."
            {...form.getInputProps("title")}
            />

            <Button type="submit"></Button>
         </form>
        </Modal>
        <Group grow>  
        <Button mb={12} fullWidth onClick={() => setOpen(true)}> 
          ADD TODO
        </Button>
        </Group>          
    </>
    );
}