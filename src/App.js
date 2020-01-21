import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Informacion from "./components/Informacion";
import axios from 'axios';

const App = () => {

    const [artista, agregarArtista] = useState('');
    const [letra, agregarLetra] = useState([]);
    const [info, agregarInfo] = useState({});


    const consultarApiLetra = async busqueda => {
        const {artista, cancion} = busqueda;

        const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        const urlInfo = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

        const [respuestaLetra, respuestaInfo] = await Promise.all([
            axios(urlLetra),
            axios(url)
        ]);

        agregarArtista(artista);
        agregarLetra(respuestaLetra.data.lyrics);   
        agregarInfo(respuestaInfo.data.artists[0]);
    }


   /*const consultarApiLetra = async busqueda => {
        const {artista, cancion} = busqueda;
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        const resultado = await axios(url);
        agregarArtista(artista);
        agregarLetra(resultado.data.lyrics);
    }*/

    /*const consultarApiInfo = async () => {
        if(artista) {
            const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
            const resultado = await axios(url);
            agregarInfo(resultado.data.artists[0]);
        }
    }

    useEffect(() => {
        consultarApiInfo();
    }, [artista])*/

    return (
        <Fragment>
            <Formulario
                consultarApiLetra={consultarApiLetra}
            />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <Informacion
                            info={info}
                        />
                    </div>
                    <div className="col-md-6">
                        <Cancion
                            letra={letra}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default App;
