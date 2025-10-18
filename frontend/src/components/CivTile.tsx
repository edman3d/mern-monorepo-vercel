import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
// import { Note as NoteModel } from "../models/note";
import { Civilization as CivilizationModel } from "../models/civilization";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface CivTileProps {
    civ: CivilizationModel,
    onCivTileClicked: (note: CivilizationModel) => void,
    onDeleteCivTileClicked: (note: CivilizationModel) => void,
    className?: string,
}

const CivTile = ({ civ, onCivTileClicked, onDeleteCivTileClicked, className }: CivTileProps) => {
    const {
        name,
        unique_unit,
        unique_tech,
        unique_buildings,
        updatedAt,
        army_type,
        createdAt
    } = civ;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onCivTileClicked(civ)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {name}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteCivTileClicked(civ);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {army_type}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default CivTile;