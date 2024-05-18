interface IconProps {
    className?: string;
    width?: number;
    height?: number;
}

const SearchIcon = ({ className, width = 24, height = 24 }: IconProps) => {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 24 24">
            <path d="M10,2C5.589,2,2,5.589,2,10s3.589,8,8,8c1.614,0,3.109-0.511,4.343-1.371l5.514,5.514c0.195,0.195,0.451,0.293,0.707,0.293
      s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-5.514-5.514C17.489,13.109,18,11.614,18,10C18,5.589,14.411,2,10,2z
      M10,16c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S13.309,16,10,16z"/>
        </svg>
    )
}

export default SearchIcon;