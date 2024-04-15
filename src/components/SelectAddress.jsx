
//use ref es nuestro query selector
import{ useState, useEffect, useRef } from 'react';


export default function SelectAddress() {
    const url = "https://apis.datos.gob.ar/georef/api"
    const [provincias, setProvincias] = useState([])
    const [idProvincias, setIdProvincias] = useState([])
    const [municipios, setMunicipios] = useState([])
    const selectProvincia = useRef()


    const stopSend = (e) => {
        e.preventDefault();
        console.log("Detuve el submit")
    }

    const updateIdProvincias = () => {
        setIdProvincias(selectProvincia.current.value)
    }

    useEffect(() => {
        const getProvincias = async () => {
            const response = await fetch(`${url}/provincias`)
            const prov = await response.json();
            setProvincias(prov.provincias)
            console.log(prov.provincias[0].id)
        }
        getProvincias()
    },[]);

    useEffect(() => {
        const getMunicipios = async () => {
            const response = await fetch(`${url}/municipios?provincia=${idProvincias}`)
            const muni = await response.json();
            setProvincias(muni.municipios)
        }
        if(idProvincias != ""){
            getMunicipios()
        }
       
    },[idProvincias]);



  return (
    <div>

        <form method="" action="" onSubmit={stopSend} >
            <div>
                <label htmlFor='Provincias'>Provincias</label>
            <select name="" id="" ref={selectProvincia} onChange={updateIdProvincias} >
            {provincias.length > 0 &&
                provincias.map((provincia) => {
                    return <option key={provincia.nombre} value={provincia.id}>{provincia.nombre}</option>
                }) }
            </select>
            </div>
           
                <div>
                    <label>Municipios</label>
                <select name="" id="" >
            {municipios.length > 0 &&
                municipios.map((municipio, i) => {
                    return <option key={`${i}+${municipio.nombre}`} value={municipio.id}>{municipio.nombre}</option>
                }) }
            </select>
                </div>
            
                <button>Registro</button>
        </form>
    </div>
  )
}


