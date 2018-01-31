let pkgs = import <nixpkgs> {};

in pkgs.stdenv.mkDerivation rec {
  name = "pimote-alexa-skill";

  buildInputs = with pkgs; [
    nodejs-6_x
  ];
}
