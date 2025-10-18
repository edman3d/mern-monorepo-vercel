import { useEffect, useState } from "react";
import { Civilization as CivilizationModel } from '../models/civilization';
import * as CivsApi from "../network/civs_api";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import styles from "../styles/CivilizationsPage.module.css";
import CivTile from "../components/CivTile";
import AddEditCivDialog from "../components/AddEditCivDialog";

const CivilizationsPage = () => {
    const [civs, setCivs] = useState<CivilizationModel[]>([]);
    const [civsLoading, setCivsLoading] = useState(true);
    const [showCivsLoadingError, setShowCivsLoadingError] = useState(false);

    // const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [civToEdit, setCivToEdit] = useState<CivilizationModel | null>(null);

    useEffect(() => {
        async function loadCivs() {
            try {
                setShowCivsLoadingError(false);
                setCivsLoading(true);
                const civs = await CivsApi.fetchCivilizations();
                setCivs(civs);
            } catch (error) {
                console.error(error);
                setShowCivsLoadingError(true);
            } finally {
                setCivsLoading(false);
            }
        }
        loadCivs();
    }, []);

    const civsGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.civsGrid}`}>
            {civs.map(civ => (
                <Col key={civ._id}>
                    <CivTile
                        civ={civ}
                        className={styles.civ}
                        onCivTileClicked={setCivToEdit}
                        onDeleteCivTileClicked={() => { }}
                    />
                </Col>
            ))}
        </Row>

    return (
        <>
            {civsLoading && <Spinner animation='border' variant='primary' />}
            {showCivsLoadingError && <p>Something went wrong loading civs. Please refresh the page.</p>}
            {!civsLoading && !showCivsLoadingError &&
                <>
                    {civs.length > 0
                        ? civsGrid
                        : <p>No civs were found</p>
                    }
                </>
            }
            {civToEdit &&
                <AddEditCivDialog
                    civToEdit={civToEdit}
                    onDismiss={() => setCivToEdit(null)}
                    onCivSaved={(updatedCiv) => {
                        setCivs(civs.map(existingCiv => existingCiv._id === updatedCiv._id ? updatedCiv : existingCiv));
                        setCivToEdit(null);
                    }}
                />
            }
        </>
    );
}

export default CivilizationsPage;