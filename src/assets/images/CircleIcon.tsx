const CircleIcon = ({percentage} : {percentage: number}) => (
    <svg
        viewBox="0 0 20 20"
    >
        <circle
            r="10"
            cx="10"
            cy="10"
            fill="#e9ecef"
        />
        <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
        />
        <circle
            r="8"
            cx="10"
            cy="10"
            fill="white"
        />
    </svg>
)

export default CircleIcon