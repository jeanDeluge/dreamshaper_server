import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CanvasDrawing() {

  const navigate = useNavigate()
  const id = useParams()["id"]
  const canvasRef = useRef(null);
  
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState(null)
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [strokeRadius, setStokeRaudius] = useState(10)

  useEffect(() => {
    const canvas = canvasRef.current;

    // 이미지 로딩 후 캔버스에 그림을 그립니다.
    if (image) {

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
    }
  }, [image]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      setHeight(img.height)
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        canvasRef.width = img.width;
        canvasRef.height = img.height;
        setImage(img);
      };
    };

    reader.readAsDataURL(file);
  };

  const onDown = useCallback((event) => {
    const coordinates = getCoordinates(event)
    if (coordinates) {
      setPosition(coordinates)
      setDrawing(true)
    }
  }, [])
  const handleStrokeWidth= (e)=>{
   const stroke = e.target.value
   setStokeRaudius(stroke)
  }

  const onUp = useCallback(() => {
    setDrawing(false)
    setPosition(null)
  }, [])

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return null
    }

    const x = event.pageX || event.touches[0].pageX
    const y = event.pageY || event.touches[0].pageY

    return {
      x: x - canvasRef.current.offsetLeft,
      y: y - canvasRef.current.offsetTop
    }
  }

  const onMove = useCallback(
    (event) => {
      if (drawing) {
        const newPosition = getCoordinates(event)
        if (position && newPosition) {
          drawLine(position, newPosition)
          setPosition(newPosition)
        }
      }
    },
    [drawing, position]
  )

  const drawLine = (originalPosition, newPosition) => {
    if (!canvasRef.current) {
      return null
    }


    const context = canvasRef.current.getContext('2d')

    if (context) {
      context.strokeStyle = "black"
      context.lineJoin = 'round'
      context.lineWidth = strokeRadius

      context.beginPath()
      context.moveTo(originalPosition.x, originalPosition.y)
      context.lineTo(newPosition.x, newPosition.y)
      context.closePath()

      context.stroke()
    }
  }

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    const imageDataUrl = canvas.toDataURL('image/png')

    const blob = dataURLToBlob(imageDataUrl);


    const formdata = new FormData();
    const config = {
      Headers: {
        'content-type': 'multipart/form-data'
      }
    }
    formdata.append("image", blob)

    await axios.post(`${process.env.REACT_APP_AI_API}/draw`, formdata, config).then(response=>{
      const url =  `${process.env.REACT_APP_AWS_API}/${response.data["image"]}`
      sessionStorage.setItem("gen_image_file", url)
      navigate(`/service/${id}/result`)

    })
  };


  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <label>선크기</label>
      <input type='text' onChange={handleStrokeWidth} placeholder='선 크기 선택하세요'></input>
      { image && <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseMove={onMove}
        style={{ border: '1px solid black' }}
      ></canvas>}
      <button type="button" onClick={handleDownload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">이미지 생성</button>
    </div>

  );
}

export default CanvasDrawing;
