import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }


  async create(createPokemonDto: CreatePokemonDto) {
    try {

      createPokemonDto.name = createPokemonDto.name.toUpperCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }
  }


  findAll() {
    return this.pokemonModel.find();
  }


  async findOne(term: string) {

    let pokemon: Pokemon;

    //No
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // MongoId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toUpperCase() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no '${term}' not found`)
    }

    return pokemon;
  }


  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {

      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toUpperCase();
      }
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error);
    }

  }


  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (!deletedCount) {
      throw new NotFoundException(`Pokemon with id "${id}" not found`);
    }

  }


  private handleExceptions(error: any) {

    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in DB: ${JSON.stringify(error.keyValue)}`)
    }
    console.error(error);

    throw new InternalServerErrorException('Oops! We couldn’t update the Pokémon. It’s still in the wild');

  }

}
