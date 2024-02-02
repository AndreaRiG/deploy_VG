import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from './Detail.module.css'

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const myVideoG = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(params.id));
  }, [dispatch, params.id]);

  console.log(myVideoG.genres);

  return (

    <>

      <div className={style.informacion}>
        {Object.keys(myVideoG).length > 0 ? (
          <div>
            <p className={style.titulo}>{myVideoG.name}</p>
            <div className={style.img}>
              <img className={style.img_2}
                src={myVideoG.background_image}
                alt="" />
            </div>
            <p className={style.texto}>description: {myVideoG.description?.replace(/<[^>]*>/g, "")}</p>

            <div className={style.informacion_2}>
              <p>released: {myVideoG.released}</p>

              <p>rating: {myVideoG.rating}</p>

              <p>
                genres:{" "}
                {Array.isArray(myVideoG.genres)
                  ? myVideoG.genres.map((genre) => genre).join(", ")
                  : myVideoG.genres}
              </p>

              <p>
                platforms:{" "}
                {Array.isArray(myVideoG.platform)
                  ? myVideoG.platform.map((platform) => platform).join(", ")
                  : myVideoG.platform}
              </p>

            </div>
          </div>



        ) : (
          <p>Loading...</p>
        )
        }
        <div className={style.botonHome2}>
          <Link to="/home">
            <button className={style.botonHome}>
              Return
            </button>
          </Link>
        </div>
      </div>

    </>
  );
};


export default Detail;
