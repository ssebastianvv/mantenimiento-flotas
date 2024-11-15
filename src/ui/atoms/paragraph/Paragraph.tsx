interface ParagraphProps{
    children: React.ReactNode;
    classname?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({children, classname}) =>{
    return(
        <p className={classname}>{children}</p>
    )
}

export default Paragraph;