import {useState } from "react";
import { useForm } from "@mantine/form";
import { Modal } from "@mantine/core";
import React from "react";


function AddTodo(){
    const[open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: '',
            body: '',
        },
    });

    return(
    
    <>  
        <Modal opened={open} onClose={() => setOpen(false)} title="create todo">
         text
        </Modal>
    </>
    );
}