import axios from 'axios';
import { useEffect, useState } from 'react';
import './formFipe.css';

function MarcasDropdown() {
    const [marcas, setMarcas] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState('');
    const [modelos, setModelos] = useState([]);
    const [modeloSelecionado, setModeloSelecionado] = useState('');
    const [anos, setAnos] = useState([]);
    const [anoSelecionado, setAnoSelecionado] = useState('');
    const [details, setDetails] = useState({});

    const fetchMarcas = async () => {
        const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        setMarcas(response.data);
    };

    const fetchModelos = async (marcaCodigo) => {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`);
        setModelos(response.data.modelos);
    };

    const fetchAnos = async (marcaCodigo, modeloCodigo) => {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`);
        setAnos(response.data);
    };

    const fetchDetails = async (marcaCodigo, modeloCodigo, anoCodigo) => {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`);
        setDetails(response.data);
    };

    useEffect(() => {
        fetchMarcas();
    }, []);

    useEffect(() => {
        if (marcaSelecionada) {
            fetchModelos(marcaSelecionada);
            setModeloSelecionado('');
            setModelos([]);
            setAnos([]);
            setAnoSelecionado('');
            setDetails({});
        }
    }, [marcaSelecionada]);

    useEffect(() => {
        if (modeloSelecionado) {
            fetchAnos(marcaSelecionada, modeloSelecionado);
            setAnoSelecionado('');
            setAnos([]);
            setDetails({});
        }
    }, [modeloSelecionado, marcaSelecionada]);

    useEffect(() => {
        if (anoSelecionado) {
            fetchDetails(marcaSelecionada, modeloSelecionado, anoSelecionado);
        }
    }, [anoSelecionado, marcaSelecionada, modeloSelecionado]);

    const handleMarcaChange = (event) => {
        setMarcaSelecionada(event.target.value);
    };

    const handleModeloChange = (event) => {
        setModeloSelecionado(event.target.value);
    };

    const handleAnoChange = (event) => {
        setAnoSelecionado(event.target.value);
    };

    return (
        <div className='main'>
            <div className='formSearch'>
                <h2>Buscar veículo</h2>
                <label htmlFor="marcas">Selecione uma marca:</label>
                <select id="marcas" name="marcas" onChange={handleMarcaChange} value={marcaSelecionada}>
                    <option value="">Selecione...</option>
                    {marcas.map(marca => (
                        <option key={marca.codigo} value={marca.codigo}>{marca.nome}</option>
                    ))}
                </select>
                {modelos.length > 0 && (
                    <div>
                        <label htmlFor="modelos">Selecione um modelo:</label>
                        <select id="modelos" name="modelos" onChange={handleModeloChange} value={modeloSelecionado}>
                            <option value="">Selecione...</option>
                            {modelos.map(modelo => (<option key={modelo.codigo} value={modelo.codigo}>{modelo.nome}</option>))}
                        </select>
                    </div>
                )}
                {anos.length > 0 && (
                    <div>
                        <label htmlFor="anos">Selecione o ano:</label>
                        <select id="anos" name="anos" onChange={handleAnoChange} value={anoSelecionado}>
                            <option value="">Selecione...</option>
                            {anos.map(ano => (<option key={ano.codigo} value={ano.codigo}>{ano.nome}</option>))}
                        </select>
                    </div>
                )}
            </div>

            <div className='formTable'>
                {anoSelecionado && details.Marca && (
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
        </div>
    );
}

export default MarcasDropdown;
