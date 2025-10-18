import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { Civilization } from "../models/civilization";
import { CivInput } from "../network/civs_api";
import * as CivsApi from "../network/civs_api";
import TextInputField from "./form/TextInputField";

interface AddEditCivDialogProps {
    civToEdit?: Civilization,
    onDismiss: () => void,
    onCivSaved: (civ: Civilization) => void,
}

const AddEditNoteDialog = ({ civToEdit, onDismiss, onCivSaved }: AddEditCivDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CivInput>({
        defaultValues: {
            name: civToEdit?.name || "",
            unique_unit: civToEdit?.unique_unit || "",
            unique_tech: civToEdit?.unique_tech || "",
            team_bonus: civToEdit?.team_bonus || "",
            civilization_bonus: civToEdit?.civilization_bonus || "",
            image: civToEdit?.image || "",
            unique_buildings: civToEdit?.unique_buildings || "",
            expansion: civToEdit?.expansion || "",
            army_type: civToEdit?.army_type || "",
        }
    });

    async function onSubmit(input: CivInput) {
        try {
            let civResponse: Civilization;
            if (civToEdit) {
                civResponse = await CivsApi.updateCiv(civToEdit._id, input);
            } else {
                civResponse = await CivsApi.createCiv(input);
            }
            onCivSaved(civResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {civToEdit ? "Edit Civ" : "Add Civ"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditCivForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="name"
                        label="Name"
                        type="text"
                        placeholder="Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.name}
                    />

                    <TextInputField
                        name="unique_unit"
                        label="Unique Units"
                        as="textarea"
                        rows={5}
                        placeholder="Composite Bowman;Elite Composite Bowman;"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditCivForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;