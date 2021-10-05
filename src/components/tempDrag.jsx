import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

import './drag.css'



const URLImage = ({ image, handleClick }) => {
    const [img] = useImage(image.src);

    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            width={100}
            height={90}
            // I will use offset to set origin to the center of the image
            offsetX={img ? 100 / 2 : 0}
            offsetY={img ? 90 / 2 : 0}
            onClick={handleClick}
        />
    );
};

const Drop = (props) => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const [playRemoveEffect] = useSound(removeEffect)
    const [hover, setHover] = React.useState(false)


    const playSoundEffect = (soundEffectIndex) => {
        console.log("i am at " + soundEffectIndex)
        if (soundEffectIndex < sounds.length) {
            sounds[soundEffectIndex].play();
        }
    }

    return (
        <div className="noselect parentDiv" >
            <br />
            <DragDropContainer targetKey="me" >
                <div >
                    <img
                        alt="lion"
                        src={props.img}
                        className={"noselect draggableImage " + animate}
                    />
                </div>
            </DragDropContainer>

            <DropTarget targetKey="me" >
                <Stage
                    width={300}
                    height={200}
                    ref={stageRef}
                >
                    <Layer>
                        {images.map((image) => {
                            return <URLImage image={image} handleClick={() => {
                                setImages(
                                    images.filter(item => item !== image)
                                )
                               
                                props.decCount(1)
                            }} />;
                        })}
                    </Layer>
                </Stage>
            </DropTarget>

            {/* <div >
                <img
                    alt="lion"
                    
                    src={props.img}
                    draggable={props.count < 10 ? "true" : "false"}
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                    className={"noselect draggableImage " + animate}
                />
            </div>
            <br />
            <br /> */}
            {/* <div

                onDrop={(e) => {
                    e.preventDefault();
                    // register event position
                   
                    stageRef.current.setPointersPositions(e);
                    // add image

                    setImages(
                        images.concat([
                            {
                                ...stageRef.current.getPointerPosition(),
                                src: dragUrl.current,
                            },
                        ])
                    );

                    props.incCount(1)
                    playSoundEffect(props.count)

                    //setCount(count + 1)
                }}
                onDragOver={(e) => e.preventDefault()}
                className="dropBox"
            > */}


            {/* </div> */}
            {/* <div>
                <h1>{props.count}</h1>
            </div> */}
        </div>
    );
};

export default Drop;
