import { useNavigate } from "react-router-dom";

const AlbumItem = ({ imageUrl, name, description, id, nameHtml, descriptionHtml }) => {
    const navigate = useNavigate();
    return (
        <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]" onClick={() => navigate(`/album/${id}`)}>
            <img src={imageUrl} alt="image" className="rounded" />
            {nameHtml ? (
                <p className="font-bold mt-2 mb-1" dangerouslySetInnerHTML={{ __html: nameHtml }} />
            ) : (
                <p className="font-bold mt-2 mb-1">{name}</p>
            )}
            {descriptionHtml ? (
                <p className="text-slate-200 text-sm" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            ) : (
                <p className="text-slate-200 text-sm">{description}</p>
            )}
        </div>
    )
}

export default AlbumItem;