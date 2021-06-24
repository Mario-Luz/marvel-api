<h1>Characters</h1>
<ul>
  {characters.map(characters => {
    return (
      <li key={characters.id}>
        <img src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`} alt={`Foto do ${characters.name}`} />
        <span className="name">{characters.name}</span>
        <span className="description">{characters.description}</span>
      </li>
    )
  })}
</ul>