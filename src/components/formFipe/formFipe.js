import axios from 'axios';
import { useEffect, useState } from 'react';

function MarcasDropdown() {
    const [marcas, setMarcas] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState('');
    const [modelos, setModelos] = useState([]);
    const [modeloSelecionado, setModeloSelecionado] = useState('');
    const [anos, setAnos] = useState([]);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchMarcas = async () => {
            const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
            setMarcas(response.data);
        };
        fetchMarcas();
    }, []);

    useEffect(() => {
        const fetchModelos = async () => {
            const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos`);
            setModelos(response.data.modelos);
        };
        if (marcaSelecionada !== '') {
            fetchModelos();
        }
    }, [marcaSelecionada]);

    useEffect(() => {
        const fetchAnos = async () => {
            const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`);
            setAnos(response.data);

        };
        if (modeloSelecionado !== '') {
            fetchAnos();
        }
    }, [marcaSelecionada, modeloSelecionado]);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${details}`);
            setDetails(response.data);
        };
        if (anos !== '') {
            fetchDetails();
        }
    }, [marcaSelecionada, modeloSelecionado, anos]);

    const handleMarcaChange = (event) => {
        setMarcaSelecionada(event.target.value);
        setModeloSelecionado('');
        setAnos([]);
    };

    const handleModeloChange = (event) => {
        setModeloSelecionado(event.target.value);
    };

    const handleAnoChange = (event) => {
        setDetails(event.target.value);
    };

    return (
        <div>
            <label htmlFor="marcas">Selecione uma marca:</label>
            <select id="marcas" name="marcas" onChange={handleMarcaChange}>
                <option value="">Selecione...</option>
                {marcas.map(marca => (
                    <option key={marca.codigo} value={marca.codigo}>{marca.nome}</option>
                ))}
            </select>
            {modelos.length > 0 && (
                <div>
                    <label htmlFor="modelos">Selecione um modelo:</label>
                    <select id="modelos" name="modelos" onChange={handleModeloChange}>
                        <option value="">Selecione...</option>
                        {modelos.map(modelo => (<option key={modelo.codigo} value={modelo.codigo}>{modelo.nome}</option>
                        ))}
                    </select>
                </div>
            )}
            {anos.length > 0 && (
                <div>
                    <label htmlFor="anos">Selecione o ano:</label>
                    <select id="anos" name="anos" onChange={handleAnoChange}>
                        <option value="">Selecione...</option>
                        {anos.map(ano => (<option key={ano.codigo} value={ano.codigo}>{ano.nome}</option>
                        ))}
                    </select>
                </div>
            )}

            {details.length > 0 && (
                <div>
                    <h2>Detalhes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{details.Marca}</td>
                                <td>{details.Modelo}</td>
                                <td>{details.AnoModelo}</td>
                                <td>{details.Valor}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default MarcasDropdown;