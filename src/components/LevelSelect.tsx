import React from "react";
import '../App.css';

interface LevelSelectProps {
    pageNum: number,
    maxPageNum: number,
    maxLevelCompleted: number, 
    onClickLevel: (levelNum: number) => void,
    onClickPageLeft: React.MouseEventHandler<HTMLButtonElement>,
    onClickPageRight: React.MouseEventHandler<HTMLButtonElement>
}

interface LevelSelectPageProps {
    pageNum: number,
    maxLevelCompleted: number,
    onClick: (levelNum: number) => void
}

interface LevelSelectNavButtonLeftProps {
    pageNum: number,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface LevelSelectNavButtonRightProps {
    pageNum: number,
    maxPageNum: number,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function LevelSelectNavButtonLeft({ pageNum, onClick }: LevelSelectNavButtonLeftProps) {
    return(
        <button 
            className="button-8bit"
            onClick={onClick} 
            disabled={pageNum === 0}
            style={{width: '32px', height: '24px'}}
        >
        {"<"}
        </button>
    );
}

export function LevelSelectNavButtonRight({ pageNum, maxPageNum, onClick }: LevelSelectNavButtonRightProps) {

    return(
        <button 
            className="button-8bit"
            onClick={onClick} 
            disabled={pageNum >= maxPageNum}
            style={{width: '32px', height: '24px'}}
        >
        {">"}
        </button>
    );
}

export function LevelSelect({ pageNum, maxPageNum, maxLevelCompleted, onClickLevel, onClickPageLeft, onClickPageRight }: LevelSelectProps) {
    return(
        <div id="level-select" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            {LevelSelectPage({ pageNum, maxLevelCompleted, onClick: onClickLevel })}
            <div id="level-select-nav-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '80px', marginTop: '10px' }}>
                {LevelSelectNavButtonLeft({ pageNum, onClick: onClickPageLeft })}
                {LevelSelectNavButtonRight({ pageNum, maxPageNum, onClick: onClickPageRight })}
            </div>
        </div>
    );
}

export function LevelSelectPage({ pageNum, maxLevelCompleted, onClick }: LevelSelectPageProps) {
    return(
        <div
            id="level-select-grid-container"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gridTemplateRows: 'repeat(5, 32px)', gap: '5px'}}
        >
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => {
                const levelNum = (20 * pageNum) + num;
                const solved = levelNum <= maxLevelCompleted;
                const locked = levelNum > maxLevelCompleted + 1;
                return (
                    <button
                        key={levelNum}
                        className={`button-8bit${solved ? ' level-solved' : ''}`}
                        disabled={locked}
                        onClick={(e) => {
                            e.currentTarget.blur();
                            onClick(levelNum);
                        }}
                        style={{ fontSize: '15px', width: '50px', height: '32px' }}
                    >
                    {levelNum}
                </button>
                );
            })}
        </div>
    );
}