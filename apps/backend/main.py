from processor import Processor
from utils import preview


def main():
    input_file = "dinnerandline"

    processor = Processor()

    a = processor.clip(input_file, 0, 5, "a")

    b = processor.clip(input_file, 10, 15, "b")

    processor.cross_fade(a, b, "output")

    # processor.combine(a, b, output="output")
    # preview the output
    preview("videos/output.mp4")


if __name__ == "__main__":
    main()
