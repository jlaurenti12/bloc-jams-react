import React, { Component } from 'react';
import './library.css';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import Album from './Album';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData }
  }

  render() {
   return (
     <section className='library'>
       {
         this.state.albums.map( (album, index) =>
         <Link className="albums" to={`/album/${album.slug}`} key={index}>
             <img src={album.albumCover} alt={album.title} />
             <div>{album.title}</div>
             <div>{album.artist}</div>
         </Link>
         )
       }
       </section>

    );
  }
}

export default Library;
