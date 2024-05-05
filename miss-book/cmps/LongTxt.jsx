const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    function toggleCollapse() {
        setIsCollapsed(!isCollapsed)
    }

    function renderTxt() {
        if (txt.length <= length) return txt
        return isCollapsed ? txt.slice(0, length) + "..." : txt
    }

    return (
            <p>
                {renderTxt()} 
                {txt.length > length && (
                    <span className="long-txt" onClick={toggleCollapse}>
                        {isCollapsed ? ' Read More' : ' Read Less'}
                    </span>
                )}
            </p>
    )
}