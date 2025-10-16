const SongItem = ({ name, image, desc, id, nameHtml, descHtml }) => {
    return (
        <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <img src={image} alt="album image" className="rounded" />
            {nameHtml ? (
                <p className="font-bold mt-2 mb-1" dangerouslySetInnerHTML={{ __html: nameHtml }} />
            ) : (
                <p className="font-bold mt-2 mb-1">{name}</p>
            )}
            {descHtml ? (
                <p className="text-slate-200 text-sm" dangerouslySetInnerHTML={{ __html: descHtml }} />
            ) : (
                <p className="text-slate-200 text-sm">{desc}</p>
            )}
        </div>
    )
}

export default SongItem;