import React, {useEffect, useReducer, useRef} from 'react';

import reducer, {initialState, TYPES} from './reducer';
import './style.scss';

export interface Slide {
    id: string;
    name: string;
}

export const TAG_POSITIONS = {
    FIRST: 'FIRST',
    LAST: 'LAST',
    SELECTED: 'SELECTED',
};

const data: Slide[] = [
    {
        id: '1',
        name: 'All',
    },
    {
        id: '2',
        name: 'New',
    },
    {
        id: '3',
        name: 'Popular',
    },
    {
        id: '4',
        name: 'Keno',
    },
    {
        id: '5',
        name: 'Table',
    },
    {
        id: '6',
        name: 'Lottery',
    },
    {
        id: '7',
        name: 'Prices',
    },
    {
        id: '8',
        name: 'Top list',
    },
];

export default function TagsSlider({windowSize}: any): any {
    const slidesListRef: React.MutableRefObject<any> = useRef(null);
    const slidesRef: React.MutableRefObject<any> = useRef(null);
    const [{selectedIndex, slides}, dispatch] = useReducer<React.Reducer<any, any>>(
        reducer,
        initialState,
    );

    function goHandler(oldVal: number, val: number): void {
        const block = slidesListRef.current;
        const blockPos = block.getBoundingClientRect();
        const slidesArr = [...block.children];

        if (val < 1) {
            dispatch({type: TYPES.SET_SELECTED_INDEX, selectedIndex: data.length});
            scrollPagination(data.length, TAG_POSITIONS.LAST);
        } else if (val > data.length) {
            dispatch({type: TYPES.SET_SELECTED_INDEX, selectedIndex: 1});
            scrollPagination(1, TAG_POSITIONS.FIRST);
        } else {
            dispatch({type: TYPES.SET_SELECTED_INDEX, selectedIndex: val});
            scrollPagination(val, TAG_POSITIONS.SELECTED);
        }

        function scrollPagination(slideId: number, type: string) {
            const selectedBlockPos = slidesArr[slideId - 1]?.getBoundingClientRect();

            if (type === TAG_POSITIONS.FIRST) {
                block.scrollTo(0, 0);
            } else if (type === TAG_POSITIONS.LAST) {
                block.scrollBy(selectedBlockPos.x - blockPos.x, 0)
            } else if (selectedBlockPos.x < blockPos.x) {
                block.scrollBy(-selectedBlockPos.width, 0);
            } else if (blockPos.x + blockPos.width < selectedBlockPos.x + selectedBlockPos.width) {
                block.scrollBy(selectedBlockPos.width, 0);
            }
        }
    }

    function goPrevHandler() {
        goHandler(selectedIndex, selectedIndex - 1)
    }

    function goNextHandler() {
        goHandler(selectedIndex, selectedIndex + 1)
    }

    function onScroll(): void {
        const block = slidesListRef.current;
        const blockPos = block.getBoundingClientRect();
        const slidesArr = [...block.children];

        const slidesShowAr: boolean[] = slidesArr.map((elem: HTMLButtonElement): boolean => {
            const elemPos = elem.getBoundingClientRect();
            return blockPos.x <= elemPos.x && elemPos.x + elemPos.width < blockPos.x + blockPos.width;
        });
        dispatch({type: TYPES.SET_SLIDES, slides: slidesShowAr});
    }

    useEffect(() => onScroll(), [windowSize[0]]);

    return data?.length ? (
        <div className="slider">
            <button
                className="slider-button"
                onClick={goPrevHandler}
            >
                <span className="slider-button__text">{'<<'}</span>
            </button>
            <div className="slider__list" ref={slidesListRef} onScroll={onScroll}>
                {data.map((item: Slide, index: number) =>
                    <button
                        key={item.id}
                        ref={slidesRef}
                        className={`slider-button ${index + 1 === selectedIndex ? 'is-selected' : ''} ${!slides[index] ? 'is-hidden' : ''}`}
                    >
                        <span className="slider-button__text">{item.name}</span>
                    </button>
                )}
            </div>
            <button
                className="slider-button"
                onClick={goNextHandler}
            >
                <span className="slider-button__text">{'>>'}</span>
            </button>
        </div>
    ) : null;
}
