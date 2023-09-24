import React, { useState, useRef, useEffect, useCallback } from 'react';

function CanvasDrawing() {
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

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'drawn_image.png';
    link.click();
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
      <button onClick={handleDownload}> 이미지 생성</button>
    </div>

  );
}

export default CanvasDrawing;
