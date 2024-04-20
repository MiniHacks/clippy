from processor import Processor
from utils import preview


def main():
    input_file = "dinner"

    processor = Processor()

    # a = processor.clip(input_file, 0, 5, "a")
    #
    # b = processor.clip(input_file, 10, 15, "b")
    #
    # processor.cross_fade(a, b, "output")

    input_dur = processor.duration(input_file)

    start = processor.clip(input_file, start=input_dur - 30, end=input_dur - 15, output="start")
    end = processor.clip(input_file, start=input_dur - 15, output="end")

    output = processor.cross_fade(start, end, "output")

    # processor.combine(a, b, output="output")
    # preview the output
    preview(f"videos/{output}.mp4")


if __name__ == "__main__":
    main()
