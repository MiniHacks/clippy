from processor import Processor


def main():
    input_file = "input/dinnerandline.MP4"

    processor = Processor(input_file, "output/")

    processor.clip(0, 5, "dinner")


if __name__ == "__main__":
    main()
