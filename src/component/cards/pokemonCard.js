import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import PokemonDetail from "../modals/modal";

export default function PokemonCard (){
    const [pokemon,setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getPokemon = async () =>{
        try {
            setLoading(true);
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
            setPokemon(res.data.results);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    }
    useEffect(()=>{
        getPokemon();
    },[]);

    return (
      <>
        {loading ? (
          <div></div>
        ) : (
          <div>
            <PokemonDetail id={selected} isOpen={isOpen} onClose={onClose} />
            <div className="grid">
              {pokemon.map((data, index) => (
                <a
                  className="grid-item"
                  onClick={async (e) => {
                    setSelected(index + 1);
                    onOpen(e);
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      index + 1
                    }.png`}
                    alt="404 not found"
                  />
                  <p>{data.name}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </>
    );
}