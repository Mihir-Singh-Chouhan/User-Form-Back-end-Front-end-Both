function Dropdown({value, onChange})
{
    return(
        <>
        <div className="dropdown">
            <select name="education" id="education" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Select Education</option>
                <option value="Master's or Above">Master's or Above</option>
                <option value="Under Graduate">Under Graduate</option>
                <option value="12">12th Grade</option>
                <option value="10">10th Grade</option>
            </select>
        </div>
        </>
    )
}
export default Dropdown;